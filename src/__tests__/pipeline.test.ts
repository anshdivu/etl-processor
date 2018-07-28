import Pipeline from '../pipeline';
import Processor from '../processor';

describe('Pipeline', () => {
  it('run', () => {
    const pipeline = Pipeline.parse(p => {
      p.source([{ a: 1 }, { a: 2 }]);
      p.source({ b: 1 });

      p.transform(obj => ({ ...obj, a: obj.a ? obj.a + 10 : 1 }));
      p.transform(obj => ({ ...obj, b: obj.b ? obj.b + 10 : 1 }));

      p.destination(obj => {
        console.log(obj);
        return obj;
      });
    });

    Processor.run(pipeline);
  });
});
