import Pipeline, { SourceInterface } from '../pipeline';
import Processor from '../processor';
import { of } from 'rxjs';

class RxSource implements SourceInterface<{ a: number }> {
  observe = () => {
    return of({ a: 1 }, { a: 2 });
  };
}

describe('Pipeline', () => {
  it('run', () => {
    const pipeline = Pipeline.parse(p => {
      p.source(new RxSource());
      p.source({ b: 1 });

      p.transform(({ a, b }) => {
        return { a: a + 10, b };
      });
      p.transform(({ a, b }) => {
        return { a, b: b + 10 };
      });

      p.destination(obj => console.log(obj));
    });

    Processor.run(pipeline);
  });
});
