import Pipeline, { Transformer, Destination, Data, Source } from './pipeline';
import { map } from 'rxjs/operators';

export default class Processor {
  static run = (pipeline: Pipeline) => {
    pipeline.sources.map(source => processSource(source, pipeline));
  };
}

function processSource<T>(
  source: Source<T>,
  { transformers, destinations }: Pipeline
) {
  const data = source.pipe(
    map(rawData => transformData(transformers, rawData))
  );

  return data.subscribe(data => sendData(destinations, data));
}

function transformData<R, T>(
  transformers: Array<Transformer<R, T>>,
  rawData: Data<R>
): Data<T> {
  return transformers.reduce((data, transform) => transform(data), rawData);
}

function sendData(destinations: Array<Destination>, data: Data) {
  destinations.forEach(destination => destination(data));
}
