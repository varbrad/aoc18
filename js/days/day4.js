import readFile from '../utils/readFile';

const testInput = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-02 00:50] wakes up
[1518-11-01 00:25] wakes up
[1518-11-01 00:55] wakes up
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-05 00:45] falls asleep
[1518-11-04 00:36] falls asleep
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-01 00:30] falls asleep
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-05 00:55] wakes up`;

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
