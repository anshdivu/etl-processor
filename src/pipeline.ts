export type Data = object;
export type Source = Array<Data>;
export type Transformer = (obj: Data) => Data;
export type Destination = (obj: Data) => Data;

export default class Pipeline {
  sources: Array<Source>;
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

  source = (rawData: object | Source) => {
    const data = Array.isArray(rawData) ? rawData : [rawData];
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
