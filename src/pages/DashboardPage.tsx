import { loadData, saveData } from '../services/storage';
import { canTransition } from '../utils/lifecycle';

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  fields: any[];
  status: string;
  createdAt: string;
}

const CONTRACT_KEY = 'contracts';

const DashboardPage = () => {
  const contracts: Contract[] = loadData(CONTRACT_KEY);

  const updateStatus = (id: string, newStatus: string) => {
    const updated = contracts.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    saveData(CONTRACT_KEY, updated);
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Contracts Dashboard</h2>

      {contracts.length === 0 && <p>No contracts created yet.</p>}

      {contracts.map((c) => (
        <div
          key={c.id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><b>Contract:</b> {c.name}</p>
          <p><b>Blueprint:</b> {c.blueprintName}</p>
          <p><b>Status:</b> {c.status}</p>
          <p><b>Created:</b> {new Date(c.createdAt).toLocaleString()}</p>

          <div>
            {['APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED'].map((s) =>
              canTransition(c.status, s) ? (
                <button
                  key={s}
                  onClick={() => updateStatus(c.id, s)}
                  style={{ marginRight: 5 }}
                >
                  {s}
                </button>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
