import modelExtend from 'dva-model-extend'
import { query } from '../services/posts'
import { pageModel } from './common'
import {getAllBlog} from "../services/blog";

export default modelExtend(pageModel, {

  namespace: 'post',

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/post') {
          dispatch({ type: 'query', payload: {
            status: 2,
            ...location.query,
          } })
        }
      })
    },
  },

  // 获取所有博客列表
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      var data = yield getAllBlog();

      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})
