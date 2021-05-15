import { Response } from "express";
import { PAGE_ERR, BAD_REQ_ERR, UNAUTH_REQ_ERR } from "./global-constants";

type ErrType = "bad-request" | "unauth" | "server-err";
type Image = "/img/obi-wan.jpg" | "/img/lando.jpg" | "/img/han.jpg";
interface IErrHandler {
  (type: ErrType, res: Response, isAuth: boolean): void
}
interface IData {
  img: Image,
  errorMsg: string,
  isAuth?: boolean
}

const getData = (type: ErrType): IData => {
  switch(type) {
    case "bad-request":
      return { img: "/img/obi-wan.jpg", errorMsg: BAD_REQ_ERR };
    case "unauth":
      return { img: "/img/han.jpg", errorMsg: UNAUTH_REQ_ERR };
    case "server-err":
      return { img: "/img/lando.jpg", errorMsg: PAGE_ERR };
  }
}

export const renderError: IErrHandler = (type, res, isAuth) => {
  let props: IData = getData(type);
  props.isAuth = isAuth;
  res.render("error", props);
}