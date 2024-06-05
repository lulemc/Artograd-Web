import { TenderStatus } from '../../types';

export const DotIndicator = ({ status }: { status?: TenderStatus }) => {
  const determineColor = () => {
    switch (status) {
      case TenderStatus.IDEATION:
        return 'var(--cobalt-60)';
      case TenderStatus.VOTING:
        return 'var(--purple-50)';
      case TenderStatus.SELECTION:
        return 'var(--cyan-20)';
      case TenderStatus.CLOSED:
        return 'var(--emerald-70)';
      case TenderStatus.PUBLISHED:
        return 'var(--sun-50)';
      case TenderStatus.DRAFT:
      case TenderStatus.CANCELLED:
      default:
        return '#bbb';
    }
  };
  return (
    <span
      style={{
        height: '6px',
        width: '6px',
        backgroundColor: determineColor(),
        borderRadius: '50%',
        display: 'inline-block',
        margin: 'auto 6px',
      }}
    />
  );
};
