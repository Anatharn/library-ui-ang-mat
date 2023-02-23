import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HALObject } from '../domain/hal/HALObject';
import { HALPage } from '../domain/hal/HALPage';
import { HALResponse } from '../domain/hal/HALResponse';

export abstract class AbstractService<T extends HALObject> {

    protected baseUrl: string = "/api/library/";
    private selectedEntity: T;
  
    constructor(private httpClient: HttpClient, private serviceUrl: string) {
      this.serviceUrl = serviceUrl;
      this.selectedEntity = this.newSelectedEntity();
    }
  
    selectEntity(entity: T): T {
      return this.selectedEntity = entity;
    }
  
    getSelectedEntity() : T {
      return this.selectedEntity;
    }
  
    resetSelectedEntity() : void {
      this.selectedEntity = this.newSelectedEntity();
    }
  
    abstract newSelectedEntity(): T;
  
    updateByOneUrl(url: string, urlUp: string): Observable<T> {
      let urlList = [];
      urlList.push(urlUp);
      return this.updateByUrl(url, urlList);
    }
    updateByUrl(url: string, urlList: string[]): Observable<T>{
      console.log("urlList ", urlList.join('\n'));
      let httpHeaders = new HttpHeaders({'Content-Type': 'text/uri-list'})
      return this.httpClient.put<any>(url, urlList.join('\n'), {'headers': httpHeaders})
      .pipe(
        catchError(this.handleError<any>("update", urlList))
      );
    }
    update(entity: T): Observable<T>{
      return this.httpClient.put<T>(entity._links.self.href, entity)
      .pipe(
        catchError(this.handleError<T>("update", entity))
      );
    }
    findOne(url: string): Observable<T> {
      return this.httpClient.get<T>(url).pipe(
        catchError(this.handleError<T>("get", undefined))
      );
    }
    findAll(page:HALPage): Observable<HALResponse<T>> {
      return this.httpClient.get<HALResponse<T>> (this.buildUrlWithPagination(this.serviceUrl, page));
    }
    findAllSort(page: HALPage, sort: string): Observable<HALResponse<T>> {
      return this.httpClient.get<HALResponse<T>> (this.buildUrlWithPaginationAndSorting(this.serviceUrl, page, sort));
    }
  
    findByUrl(url: string): Observable<HALResponse<T>> {
      return this.httpClient.get<HALResponse<T>>(url);
    }
  
    delete(entity: T): Observable<T>{
      console.log("delete", entity);
      return this.deleteByUrl(entity._links.self.href);
    }
  
    deleteAssociation(url: string) : Observable<T>{
      return this.deleteByUrl(url);
    }
  
    deleteByUrl(url: string): Observable<T> {
      return this.httpClient.delete<T>(url)
      .pipe(
        catchError(this.handleError<T>("delete"))
      );
    }
    add(entity: T): Observable<T>{
      console.log('add', entity);
      return this.httpClient.post<T>(this.buildUrl(this.serviceUrl), entity)
      .pipe(
        catchError(this.handleError<T>("add", entity))
      );
    }
    protected buildUrlWithPagination(action: string, page: HALPage): string{
      return `${this.buildUrl(action)}?page=${(page.number-1)}&size=${page.size}`;
    }
    protected buildUrlWithPaginationAndSorting(action: string, page: HALPage, sort: string): string{
      console.log("buildUrlWithPaginationAndSorting", sort);
      let url = this.buildUrlWithPagination(action, page);
      if(!!sort && sort !== "") {
        url += `&sort=${sort}`;
      }
      return url;
    }
    protected buildUrl(action: string ){
      console.log(this.baseUrl + action);
      return this.baseUrl + action;
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
     protected handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    protected log(message: string) {
      console.log(message);
    }
  }
