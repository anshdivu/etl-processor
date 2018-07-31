import Pipeline from '../pipeline';
import Processor from '../processor';

describe('Pipeline', () => {
  it('run', () => {
    const pipeline = Pipeline.parse(p => {
      p.source([{ a: 1 }, { a: 2 }]);
      p.source({ b: 1 });

      // @ts-ignore
      p.transform(({ a, b }) => ({ a: a + 10, b }));
      // @ts-ignore
      p.transform(({ a, b }) => ({ a, b: b + 10 }));

      p.destination(obj => console.log(obj));
    });

    Processor.run(pipeline);
  });
});
