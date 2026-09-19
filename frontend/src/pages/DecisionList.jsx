import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDecisions, searchDecisions } from "../api/decisions";
import StatusBadge from "../components/StatusBadge";

export default function DecisionList() {
  const [decisions, setDecisions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const res = await getAllDecisions();
      setDecisions(res.data);
      setError(null);
    } catch (err) {
      setError("Could not reach the backend. Is it running on port 8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return loadAll();
    setLoading(true);
    try {
      const res = await searchDecisions(query);
      setDecisions(res.data);
      setError(null);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">VELQIVO</h1>
          <p className="text-slate-500 text-sm mt-1">
            Decision records captured from Zoho Cliq
          </p>
        </div>
        <Link
          to="/new"
          className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          + New Decision
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search decisions, reasons, tasks..."
          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          type="submit"
          className="border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              loadAll();
            }}
            className="text-slate-400 text-sm px-2"
          >
            Clear
          </button>
        )}
      </form>

      {loading && <p className="text-slate-400 text-sm">Loading...</p>}
      {error && <p className="text-rose-600 text-sm">{error}</p>}

      {!loading && !error && decisions.length === 0 && (
        <p className="text-slate-400 text-sm">
          No decisions yet. Create one, or tag a message in Cliq.
        </p>
      )}

      <div className="space-y-3">
        {decisions.map((d) => (
          <Link
            to={`/decisions/${d.id}`}
            key={d.id}
            className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-400 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-slate-900">
                  {d.decisionText}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {d.reason}
                </p>
                <div className="flex gap-4 mt-3 text-xs text-slate-400">
                  <span>Owner: {d.owner || "—"}</span>
                  <span>Approved: {d.approvedBy || "—"}</span>
                  {d.relatedTask && <span>Task: {d.relatedTask}</span>}
                </div>
              </div>
              <StatusBadge status={d.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
