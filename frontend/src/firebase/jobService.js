// src/firebase/jobService.js

import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COL = "jobs";

// ── READ all jobs (newest first) ──────────────────────────────────────────────
export async function fetchJobs() {
  const q    = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      saved:     false,   // session-only, never stored
      // convert Firestore Timestamp → ISO string for consistent use in app
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
      // posted is stored as ISO string (e.g. "2025-12-03T00:00:00.000Z")
      // formatPosted() in constants.js converts it for display
    };
  });
}

// ── CREATE a job ──────────────────────────────────────────────────────────────
// Always sets `posted` to today's real ISO date — never trusts the form value
export async function createJob(data) {
  const { saved, id: _id, ...clean } = data;  // strip client-only fields

  const ref = await addDoc(collection(db, COL), {
    ...clean,
    posted:    new Date().toISOString(),  // ← real date, always today
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ── UPDATE a job ──────────────────────────────────────────────────────────────
export async function updateJob(id, data) {
  const { saved, id: _id, createdAt, ...clean } = data; // strip client-only fields
  await updateDoc(doc(db, COL, id), {
    ...clean,
    updatedAt: serverTimestamp(),
  });
}

// ── DELETE a job ──────────────────────────────────────────────────────────────
export async function deleteJob(id) {
  await deleteDoc(doc(db, COL, id));
}