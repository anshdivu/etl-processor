import { Observable, isObservable, of } from 'rxjs';

export type Data<T> = T;
export type Source<T> = Observable<Data<T>>;
export type Transformer<R, T> = (obj: Data<R>) => Data<T>;
export type Destination = (obj: Data) => void;
export interface SourceInterface<T> {
  observe(): Observable<T>;
}

export default class Pipeline {
  sources: Array<Source<T>>;
  transformers: Array<Transformer>;
  destinations: Array<Destination>;

  static parse = (callBack: (p: Pipeline) => void): Pipeline => {
    const pipeline = new Pipeline();
    callBack(pipeline);
    return pipeline;
  };

  constructor() {
    this.sources = [];
    this.transformers = [];
    this.destinations = [];
  }

  source = <T>(rawData: T | Array<T> | Observable<T>) => {
    const data = toObservable<T>(rawData);
    this.sources.push(data);
    return this;
  };

  transform = (callBack: Transformer) => {
    this.transformers.push(callBack);
    return this;
  };

  destination = (callBack: Destination) => {
    this.destinations.push(callBack);
    return this;
  };
}

function toObservable<T>(
  rawData: T | T[] | Observable<T> | SourceInterface<T>
): Observable<T> {
  if (rawData.observe instanceof Function) {
    return rawData.observe();
  }

  if (isObservable(rawData)) {
    return rawData;
  }

  if (Array.isArray(rawData)) {
    return of(...rawData);
  }

  return of(rawData);
}
