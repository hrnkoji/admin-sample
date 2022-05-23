import { atom, useRecoilState } from 'recoil';

// import { getIdTokenResult, getIdToken } from 'firebase/auth';
import { getEnv } from 'service/env';
// import { auth } from 'service/firebase';

const env = getEnv();

export type FetchHeaders = {
  [key: string]: string;
};

export type RequestConfigProps = {
  method?: string;
  body?: unknown;
};

export type RequestOptionsProps = {
  hideIndicator?: boolean;
};

export type RequestStateProps = {
  loadings: number;
};

export const requestState = atom<RequestStateProps>({
  key: 'common-request',
  default: {
    loadings: 0,
  },
});

export default function useRequest() {
  const [state, setState] = useRecoilState(requestState);

  const getToken = async () => {
    // if (!auth.currentUser) {
    //   return null;
    // }
    // const tokenResult = await getIdTokenResult(auth.currentUser);
    // let token = tokenResult.token;
    // const diff = differenceInMinutes(new Date(tokenResult.expirationTime), new Date());
    // try {
    //   // Refresh token before 10 min
    //   if (diff < 10) {
    //     await getIdToken(auth.currentUser, /* forceRefresh */ true);
    //     token = (await getIdTokenResult(auth.currentUser)).token;
    //   }
    //   return token;
    // } catch (err) {
    //   console.error('getToken err:', err);
    //   throw err;
    // }
  };

  const request = async <T>(
    path: string,
    config?: RequestConfigProps,
    options?: RequestOptionsProps,
  ): Promise<T> => {
    const url = new URL(path, env.API_BASE_URL).toString();
    if (options?.hideIndicator !== true) {
      setState((prevState) => {
        return {
          ...prevState,
          loadings: prevState.loadings + 1,
        };
      });
    }
    // const token = await getToken();
    const headers: FetchHeaders = {
      'Content-Type': 'application/json',
    };

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    try {
      const response = await window.fetch(url, {
        method: config?.method || 'GET',
        headers,
        body: JSON.stringify(config?.body),
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Call api failed');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error('API request failed:', url, options);
      throw err;
    } finally {
      if (options?.hideIndicator !== true) {
        setState((prevState) => {
          return {
            ...prevState,
            loadings: prevState.loadings - 1,
          };
        });
      }
    }
  };
  return {
    state,
    request,
    getToken,
  };
}
