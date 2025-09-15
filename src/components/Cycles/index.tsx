import { useTaskContext } from '../../app/contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../shared/utils/getNextCycle';
import { getNextCycleType } from '../../shared/utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso rápido',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Cycles: </span>

      <div className={styles.cycleDots}>
        {Array.from({ length: state.currentCycle }).map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span
              key={nextCycle}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
