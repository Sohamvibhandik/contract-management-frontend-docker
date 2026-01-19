import { useState } from 'react';
import { loadData, saveData } from '../services/storage';

interface Field {
  id: string;
  label: string;
  type: 'TEXT' | 'DATE' | 'SIGNATURE' | 'CHECKBOX';
  x: number;
  y: number;
  value?: any;
}

interface Contract {
  id: string;
  name: string;
  blueprintName: string;
  fields: Field[];
  status: string;
  createdAt: string;
}

const CONTRACT_KEY = 'contracts';
const BLUEPRINT_KEY = 'blueprints';

const CreateContractPage = () => {
  const blueprints = loadData(BLUEPRINT_KEY);
  const [contractName, setContractName] = useState('');
  const [blueprintId, setBlueprintId] = useState('');

  const createContract = () => {
    if (!contractName || !blueprintId) return;

    const blueprint = blueprints.find((b: any) => b.id === blueprintId);
    if (!blueprint) return;

    const contract: Contract = {
      id: Date.now().toString(),
      name: contractName,
      blueprintName: blueprint.name,
      fields: blueprint.fields.map((f: Field) => ({
        ...f,
        value: '',
      })),
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };

    saveData(CONTRACT_KEY, [...loadData(CONTRACT_KEY), contract]);
    setContractName('');
    alert('Contract created successfully');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Contract</h2>

      <input
        placeholder="Contract name"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />

      <br /><br />

      <select onChange={(e) => setBlueprintId(e.target.value)}>
        <option value="">Select Blueprint</option>
        {blueprints.map((b: any) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={createContract}>
        Create Contract
      </button>
    </div>
  );
};

export default CreateContractPage;
