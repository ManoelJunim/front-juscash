export interface ISessionContext {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
