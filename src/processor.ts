import Pipeline, { Transformer, Destination, Data, Source } from './pipeline';

export default class Processor {
  static run = (pipeline: Pipeline) => {
    pipeline.sources.map(source => processSource(source, pipeline));
  };
}

function processSource(
  source: Source,
  { transformers, destinations }: Pipeline
) {
  return source.map(rawData => {
    const data = transformData(transformers, rawData);
    sendData(destinations, data);
  });
}

function transformData(transformers: Array<Transformer>, rawData: Data): Data {
  return transformers.reduce((data, transform) => transform(data), rawData);
}

function sendData(destinations: Array<Destination>, data: Data) {
  destinations.forEach(destination => destination(data));
}
