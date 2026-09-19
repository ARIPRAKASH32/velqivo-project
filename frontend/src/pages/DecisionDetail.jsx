import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDecisionById, updateStatus, deleteDecision } from "../api/decisions";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["OPEN", "IN_PROGRESS", "DONE", "REVERSED"];

export default function DecisionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await getDecisionById(id);
      setDecision(res.data);
    } catch (err) {
      setError("Decision not found.");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    await updateStatus(id, newStatus);
    load();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this decision record?")) return;
    await deleteDecision(id);
    navigate("/");
  };

  if (error) return <p className="text-center mt-10 text-rose-600">{error}</p>;
  if (!decision) return <p className="text-center mt-10 text-slate-400">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-slate-400 hover:text-slate-600">
        ← Back to all decisions
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            {decision.decisionText}
          </h1>
          <StatusBadge status={decision.status} />
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div>
            <p className="text-slate-400 uppercase text-xs font-medium">Reason</p>
            <p className="text-slate-700 mt-1">{decision.reason || "—"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 uppercase text-xs font-medium">Owner</p>
              <p className="text-slate-700 mt-1">{decision.owner || "—"}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase text-xs font-medium">Approved By</p>
              <p className="text-slate-700 mt-1">{decision.approvedBy || "—"}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase text-xs font-medium">Related Task</p>
              <p className="text-slate-700 mt-1">{decision.relatedTask || "—"}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase text-xs font-medium">Source Channel</p>
              <p className="text-slate-700 mt-1">{decision.sourceChannel || "—"}</p>
            </div>
          </div>
          {decision.sourceMessageLink && (
            <div>
              <p className="text-slate-400 uppercase text-xs font-medium">
                Original Message
              </p>
              <a
                href={decision.sourceMessageLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm mt-1 inline-block break-all"
              >
                {decision.sourceMessageLink}
              </a>
            </div>
          )}
          <div>
            <p className="text-slate-400 uppercase text-xs font-medium">Created</p>
            <p className="text-slate-700 mt-1">
              {new Date(decision.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-slate-400 uppercase text-xs font-medium mb-2">
            Update Status
          </p>
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                  decision.status === s
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="mt-6 text-rose-500 text-xs hover:underline"
        >
          Delete this record
        </button>
      </div>
    </div>
  );
}
