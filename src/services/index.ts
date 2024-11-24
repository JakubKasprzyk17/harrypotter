import { toast } from '@src/utils/toast';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getI18n } from 'react-i18next';

export const API_URL = 'https://api.potterdb.com/v1';

export interface Pagination {
  page: number;
  limit: number;
}

export interface Sort {
  field: string;
  order: 'asc' | 'desc';
}

export interface ResponseWrapper<T> {
  data: T;
  meta: {
    pagination: {
      curent: number;
      last: number;
      next: number;
      records: number;
    };
  };
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

const { t } = getI18n();

apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          toast.error(t('Errors.401'));
          break;
        case 404:
          toast.error(t('Errors.404'));
          break;
        case 500:
          toast.error(t('Errors.500'));
          break;
        default:
          toast.error(t('Errors.404'));
          break;
      }
    } else {
      toast.error(t('Errors.404'));
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5
    },
    mutations: {
      retry: 3
    }
  }
});

export default queryClient;
