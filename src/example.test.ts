import EtlPipeline from './etl-pipeline';

describe('EtlPipeline', () => {
  it('run', () => {
    const job = EtlPipeline.parse(p => {
      p.source({ a: 1 });
      p.source({ b: 1 });

      p.transform(row => ({ a: row.a + 1 }));

      p.destination(row => console.log(row));
    });

    job.run();
  });
});
