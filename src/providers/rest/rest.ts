import {
  Http,
  Response,
  Headers
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {


  headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http) {
    //console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';

  private apiUrlLoginWithMd5 = 'https://imoocqa.gugujiankong.com/api/account/loginwithmd5';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname'; 
  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";

  //自己测试服务器调用
  private myAppUrlLogin = 'http://192.168.1.111:3500/myappAuth/login';
  private myAppUrlRegister = 'http://192.168.1.111:3500/myappAuth/register';
  private myAppUrlUserInfo = 'http://192.168.1.111:3500/myappAuth/userinfo';
  private myAppUrlUserInfoUpdate = 'http://192.168.1.111:3500/myappAuth/userinfoupdate';
  private myAppSaveQuestion = 'http://192.168.1.111:3500/userQuestion/save';
  private myAppGetQuestionList = 'http://192.168.1.111:3500/userQuestion/getqusetionlist';
  private myAppGetQuestion = 'http://192.168.1.111:3500/userQuestion/getquestion';
  private myAppAnswer = 'http://192.168.1.111:3500/userAnswer/answer';
  private myAppIsFavourite = 'http://192.168.1.111:3500/myappAuth/isfavourite';
  private myAppGetUserQuestionList = 'http://192.168.1.111:3500/userQuestion/getuserquestionlist';


  /**
   * 根据用户的电话号码和密码进行登录
   * 
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable < string[] >} 
   * @memberof RestProvider
   */
  login(mobile, password): Observable < string[] > {
    return this.getUrlReturn(this.myAppUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  /**
   * 注册请求
   * 
   * @param {any} mobile 
   * @param {any} nickname 
   * @param {any} password 
   * @returns {Observable < string[] >} 
   * @memberof RestProvider
   */
  register(mobile, nickname, password): Observable < string[] > {
    return this.getUrlReturn(this.myAppUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password);
  }

  updateNickName(userId,nickName,token):Observable<string[]>{
    return this.getUrlReturn(this.myAppUrlUserInfoUpdate+"?UserId="+userId+"&nickname="+nickName+'&token='+token);
  }


  /**
   * 全局获取HTTP请求的方法
   * @xiaojie 2017-12-1
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable < string[] > {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getUserInfo(token,userid):Observable<string[]>{
    return this.getUrlReturn(this.myAppUrlUserInfo+"?token="+token+"&UserId="+userid);
  }


  SaveQuestion(data):Observable<string[]>{
    const uri = this.myAppSaveQuestion;
    return this.http.post(uri,JSON.stringify(data),{headers:this.headers})
    .map(this.extractData)
    .catch(this.handleError);
  }

  getQusetionList(index,count):Observable<string[]>{
    return this.getUrlReturn(this.myAppGetQuestionList+"?index="+index+"&count="+count);
  }


  getQuestion(token,id,userId):Observable<string[]>{
    return this.getUrlReturn(this.myAppGetQuestion+"?q_id="+id+"&token="+token+"&userId="+userId);
  }


  isFavourite(q_id,user_id):Observable<string[]>{
    return this.getUrlReturn(this.myAppIsFavourite+"?q_id="+q_id+"&userId="+user_id);
  }


  getUserQuestionList(userid,type):Observable<string[]>{
    return this.getUrlReturn(this.myAppGetUserQuestionList+"?userid="+userid+"&type="+type);
  }


  userAnswer(token,userId,q_id,content){
    return this.http.get(this.myAppAnswer,{params:{
      'token':token,
      'user':userId,
      'question':q_id,
      'content':content
    }}).map(this.extractData)
    .catch(this.handleError);
  }

  /**
   * 处理接口返回的数据，处理成JSON
   * 
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
    //return JSON.parse(body) || {};
   
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理，并在consle中显示
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }




}
