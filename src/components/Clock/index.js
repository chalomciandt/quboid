import './index.css'

export default function Clock(props) {
  const { time } = props;
  const formatDate = (time === '' ? '?' : new Date(time).toLocaleTimeString());
  return (
    <p className="clock">
      Server time: <time dateTime={time}>{formatDate}</time>
    </p>
  );
}
