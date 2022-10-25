export type ImagePlayerOptions = {
  /**
   * 图片的路径
   */
  urlRoot?: string;
  /**
   * 命名规则的方法
   */
  nameRule?: (index: number) => string;
  /**
   * 帧数
   */
  frames?: number;
  /**
   * 时长,ms
   */
  duration: number;

  onEnd?: () => void;

  el?: HTMLElement;
};

export class ImagePlayer {
  static DEFAULT_OPTIONS = {
    urlRoot: '/',
    frames: 24,
    nameRule: (index: number) => `${index}.jpg`,
  };

  domEl!: HTMLElement;

  private _urlRoot!: string;

  private _nameRule!: (index: number) => string;

  private _length = 0;

  private _store: Map<number, HTMLImageElement> = new Map();

  private _index = 0;

  private _frames = 24;

  private _duration = 0;

  private _canPlay = false;

  private _options!: ImagePlayerOptions;

  private _timeId = -1;

  private _isDestroy = false;

  private _isPlaying = false;

  private _imageSrcList: { index: number; src: string }[] = [];

  private _nextIndex = 0;

  constructor(options: ImagePlayerOptions) {
    const _options = { ...ImagePlayer.DEFAULT_OPTIONS, ...options };

    this._urlRoot = _options.urlRoot;

    this._nameRule = _options.nameRule;

    this._length = Math.ceil((_options.frames * _options.duration) / 1000);

    this._frames = _options.frames;

    this._duration = _options.duration;

    this._options = _options;

    this.domEl = document.createElement('div');

    this._int();
  }

  private _int() {
    for (let i = 0; i < this._length; i++) {
      this._imageSrcList.push({ src: `${this._urlRoot}${this._nameRule(i)}`, index: i });
    }

    this._limitQueue(this._imageSrcList, 10, this._handleLoadFrame.bind(this));

    this.domEl.style.width = '100%';
    this.domEl.style.height = '100%';
    this.domEl.style.display = 'flex';
  }

  private _step = (index?: number) => {
    if (index) {
      this._index = index;
    }
    const prevImage = this._store.get(this._index - 1);
    const nextImage = this._store.get(this._index);

    if (!nextImage) {
      // 没有加载下一个的时候
      window.clearTimeout(this._timeId);
      console.log('not has next image');
      this._isPlaying = false;
      this._nextIndex = this._index;
      console.log(this._index);
      return;
    }

    if (prevImage) {
      prevImage.parentElement?.removeChild(prevImage);
      // this.domEl.removeChild(prevImage);
    }

    if (nextImage) {
      nextImage.style.maxWidth = '100%';
      nextImage.style.width = '100%';
      this.domEl.appendChild(nextImage);
    }

    this._index += 1;

    if (this._index < this._length) {
      this._timeId = window.setTimeout(this._step, 1000 / this._frames);
    } else {
      window.clearTimeout(this._timeId);
      console.log(this._index);
      // 结束了
      console.log('play end');

      this._options.onEnd?.();
    }
  };

  private async _handleLoadFrame({ src, index }: { src: string; index: number }) {
    if (this._isDestroy) return;
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = src;

      image.onload = () => {
        resolve(image);
        this._store.set(index, image);
        // if (index === this._length - 1) {
        //   this._isPlaying = false;
        // }
        this.play();
        console.log(this._store.get(index));
      };
      image.onerror = () => {
        resolve(image);
        image.dataset.state = 'error';
        this._store.set(index, image);
        if (index === this._length - 1) {
          this._isPlaying = false;
        }
        this.play();
        // this.play();
      };
    });
  }

  private _limitQueue = <T = any, R = any>(
    list: T[],
    limit: number,
    handler: (params: T) => Promise<R>,
  ) => {
    let i = 0;

    const run = () => {
      if (this._isDestroy) return;

      new Promise((resolve, reject) => {
        const p = list[i];
        i++;
        resolve(handler(p));
      })
        .then(() => {
          if (i < list.length) run();
        })
        .catch(() => {
          if (i < list.length) run();
        });
    };

    for (let executeCount = 0; executeCount < limit; executeCount++) {
      run();
    }
  };

  play() {
    if (!this._isDestroy && !this._isPlaying) {
      console.log('start playing');
      this._isPlaying = true;
      this._step();
    }
  }

  destroy() {
    console.log('destroyed');
    this._isDestroy = true;
    window.clearTimeout(this._timeId);
    const { parentElement } = this.domEl;
    this._store.clear();
    if (parentElement) {
      parentElement.removeChild(this.domEl);
    }
  }
}
