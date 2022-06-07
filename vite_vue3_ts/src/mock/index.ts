import Mock from 'mockjs'
// import Mock from 'mockjs'
import {userInfo} from './mock_template'

// Mock.mock(`${import.meta.env.VITE_BASE_URL}/common/user/get-user-info/`,userInfo)
Mock.mock(/\/common\/user\/get-user-info/,userInfo)