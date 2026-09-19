import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDecision } from "../api/decisions";

const EMPTY = {
  decisionText: "",
  reason: "",
  owner: "",
  approvedBy: "",
  relatedTask: "",
  status: "OPEN",
  sourceChannel: "",
  sourceMessageLink: "",
};

export default function DecisionForm() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.decisionText.trim()) {
      setError("Decision text is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await createDecision(form);
      navigate(`/decisions/${res.data.id}`);
    } catch (err) {
      setError("Could not save. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-slate-400 hover:text-slate-600">
        ← Back to all decisions
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">
          New Decision Record
        </h1>

        {error && (
          <p className="text-rose-600 text-sm mb-4 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Decision *" name="decisionText" value={form.decisionText} onChange={handleChange} placeholder="e.g. Use Razorpay for payments" />
          <Field label="Reason" name="reason" value={form.reason} onChange={handleChange} textarea placeholder="Why was this decided?" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Owner" name="owner" value={form.owner} onChange={handleChange} placeholder="Who's responsible" />
            <Field label="Approved By" name="approvedBy" value={form.approvedBy} onChange={handleChange} placeholder="Who signed off" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Related Task" name="relatedTask" value={form.relatedTask} onChange={handleChange} placeholder="e.g. Payment Integration" />
            <Field label="Source Channel" name="sourceChannel" value={form.sourceChannel} onChange={handleChange} placeholder="e.g. engineering" />
          </div>
          <Field label="Source Message Link" name="sourceMessageLink" value={form.sourceMessageLink} onChange={handleChange} placeholder="Link back to the original conversation" />

          <div>
            <label className="text-xs font-medium text-slate-500 uppercase">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
              <option value="REVERSED">Reversed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-slate-900 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Decision"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, textarea }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label className="text-xs font-medium text-slate-500 uppercase">{label}</label>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={textarea ? 3 : undefined}
        className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  );
}
