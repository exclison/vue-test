interface SlotList {
  header: string;
  default: string;
}
interface Column {
  type?: string;
  label?: string;
  prop?: string;
  slot?: SlotList;
  [key: string]: any;
}

interface Page {
  total: number;
  pageSize: number;
  currectPage: number;
  pageSizes?: number[];
  jump_page?: number;
}

interface SearchForm {
  [key: string]: any
}
