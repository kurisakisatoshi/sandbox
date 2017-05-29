import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';
import { HTTP_PROVIDERS, Http, Request, Response } from 'angular2/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: "my-app",
  template: `
  <h3>Http example</h3>
  <button (click)="updateStatus();">Get data.json</button>
  <p>OK: {{ ok }}</p>
  <p>Status: {{ status }}</p>
  <pre>{{ body | json }}</pre>
  `
})
class MyApp {

  private ok: boolean;
  private status: number;
  private body: string;

  constructor(private http: Http) {
  }

  updateStatus() {
    this.http.get("./data.json")
    .map(res => {
      if (res.ok) {
        return res;
      } else {
        throw new MyError(res.ok, res.status, res.json());
      }
    })
    .catch(e => {
      console.log(e);
      // Observable.throw(e);
      throw e;
    })
    .subscribe(
      res => {
        this.ok = res.ok;
        this.status = res.status;
        this.body = res.json();
      },
      e => {
        this.ok = e.ok;
        this.status = e.status;
        this.body = e.body;
      });
  }
}

class MyError extends Error {
  constructor(
    public ok: any,
    public status: any,
    public body: any,
  ) {
    super();
    this.status = this.status + 2000;
    // this.body["foo"] = "BarBar";
    this.body.foo = "bbbar";
  }
}

bootstrap(MyApp, [HTTP_PROVIDERS]);
