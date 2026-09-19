const STATUS_STYLES = {
  OPEN: "bg-slate-100 text-slate-700 border-slate-300",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-300",
  DONE: "bg-emerald-50 text-emerald-700 border-emerald-300",
  REVERSED: "bg-rose-50 text-rose-700 border-rose-300",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.OPEN;
  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border ${style}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
