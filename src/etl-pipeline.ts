export default class EtlPipeline {
  static parse = callBack => {
    const pipeline = new EtlPipeline();
    callBack(pipeline);
    return pipeline;
  };

  constructor() {
    this.sources = [];
    this.transformers = [];
    this.destinations = [];
  }

  run = () => {
    this.sources.map(source => {
      source.map(row => {
        this.transformers.map(transform => {
          row = transform(row);
        });

        this.destinations.map(destination => destination(row));
      });
    });
  };

  source = data => {
    if (!Array.isArray(data)) data = [data];

    this.sources.push(data);
    return this;
  };

  transform = callBack => {
    this.transformers.push(callBack);
    return this;
  };

  destination = callBack => {
    this.destinations.push(callBack);
    return this;
  };
}
