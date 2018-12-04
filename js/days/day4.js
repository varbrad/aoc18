import readFile from '../utils/readFile';

const input = readFile('input-4.txt')
  .split('\n')
  .filter(Boolean)
  .map(row => {
    let [year, month, day, hour, min, ins] = row
      .match(/\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.+)/)
      .slice(1);
    const time = new Date(year, month, day, hour, min);
    const hasId = ins.match(/#(\d+)/);
    const action = hasId ? hasId[1] : ins;
    return { time, action };
  })
  .sort((a, b) => a.time - b.time);

export const part1 = () => {
  const guards = {};
  let [guard, sleptAt] = [-1, 0];
  input.forEach(({ time, action }) => {
    if (action === 'falls asleep') sleptAt = time;
    else if (action === 'wakes up') {
      // In minutes
      const sleepTime = (time - sleptAt) / 1000 / 60;
      const sleepAtMin = sleptAt.getMinutes();
      guards[guard] = guards[guard] || { mins: {}, total: 0, id: guard };
      guards[guard].total += sleepTime;
      for (let i = sleepAtMin; i < sleepAtMin + sleepTime; ++i) {
        guards[guard].mins[i] = ++guards[guard].mins[i] || 1;
      }
    } else {
      guard = action;
    }
  });
  const laziestGuard = Object.values(guards).reduce((guard, nextGuard) => {
    if (!guard) return nextGuard;
    return guard.total < nextGuard.total ? nextGuard : guard;
  });
  const laziestMoment = Object.keys(laziestGuard.mins).reduce(
    (laziestMoment, min) => {
      const total = laziestGuard.mins[min];
      if (total > laziestMoment.total) return { total, min };
      return laziestMoment;
    },
    { min: -1, total: 0 },
  );
  return Number(laziestGuard.id) * Number(laziestMoment.min);
};

export const part2 = () => {
  const guards = {};
  let [guard, sleptAt] = [-1, 0];
  input.forEach(({ time, action }) => {
    if (action === 'falls asleep') sleptAt = time;
    else if (action === 'wakes up') {
      // In minutes
      const sleepTime = (time - sleptAt) / 1000 / 60;
      const sleepAtMin = sleptAt.getMinutes();
      guards[guard] = guards[guard] || { mins: {}, total: 0, id: guard };
      guards[guard].total += sleepTime;
      for (let i = sleepAtMin; i < sleepAtMin + sleepTime; ++i) {
        guards[guard].mins[i] = ++guards[guard].mins[i] || 1;
      }
    } else {
      guard = action;
    }
  });
  const laziestMoment = guard =>
    Object.keys(guard.mins).reduce(
      (laziestMoment, min) => {
        const total = guard.mins[min];
        if (total > laziestMoment.total) return { total, min };
        return laziestMoment;
      },
      { min: -1, total: 0 },
    );
  const laziestGuard = Object.values(guards).reduce(
    (bestGuard, nextGuard) => {
      const laziestMin = laziestMoment(nextGuard);
      if (!bestGuard || bestGuard.total < laziestMin.total)
        return {
          id: nextGuard.id,
          total: laziestMin.total,
          min: laziestMin.min,
        };
      return bestGuard;
    },
    { id: -1, total: -1, min: -1 },
  );
  return Number(laziestGuard.id) * Number(laziestGuard.min);
};
