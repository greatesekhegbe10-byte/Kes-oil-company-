import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Enquiry, 
  Project, 
  Supplier, 
  PurchaseOrder, 
  DocumentRecord, 
  ActivityLog,
  EnquiryStatus,
  SupplierVerification,
  PurchaseOrderStatus
} from '../types';
import { 
  initialCurrentUser, 
  availableDemoUsers, 
  initialEnquiries, 
  initialProjects, 
  initialSuppliers, 
  initialPurchaseOrders, 
  initialDocuments, 
  initialActivityLogs 
} from '../data/mockData';

export type SurfaceType = 'corporate' | 'management' | 'client' | 'supplier' | 'about' | 'services' | 'portfolio' | 'contact';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface PlatformContextType {
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  switchUser: (user: UserProfile) => void;
  surface: SurfaceType;
  setSurface: (s: SurfaceType) => void;
  activeManagementTab: string;
  setActiveManagementTab: (tab: string) => void;
  
  // Data
  enquiries: Enquiry[];
  projects: Project[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  documents: DocumentRecord[];
  activityLogs: ActivityLog[];
  
  // Actions
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'referenceNo' | 'submittedAt' | 'updatedAt'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  assignEnquiry: (id: string, assignee: string) => void;
  addEnquiryNote: (id: string, note: string) => void;
  
  addProject: (project: Omit<Project, 'id' | 'code' | 'documentsCount'>) => string;
  updateProjectProgress: (id: string, percent: number) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  addProjectTask: (projectId: string, title: string, assignee: string, dueDate: string, priority: 'Low' | 'Medium' | 'High') => void;
  
  addSupplier: (supplier: Omit<Supplier, 'id' | 'code' | 'registeredDate'>) => string;
  updateSupplierStatus: (id: string, status: SupplierVerification) => void;
  
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'poNumber' | 'issueDate'>) => string;
  updatePOStatus: (id: string, status: PurchaseOrderStatus) => void;
  
  addDocument: (doc: Omit<DocumentRecord, 'id' | 'uploadedDate'>) => void;
  deleteDocument: (id: string) => void;
  
  // UI helpers
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  modal: string | null;
  modalData: any;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
  
  resetDemoData: () => void;
}

const STORAGE_KEY = 'kes_energy_platform_state_v1';

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [surface, setSurfaceState] = useState<SurfaceType>('corporate');
  const [activeManagementTab, setActiveManagementTab] = useState<string>('Overview');

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_enquiries`);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_suppliers`);
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pos`);
    return saved ? JSON.parse(saved) : initialPurchaseOrders;
  });

  const [documents, setDocuments] = useState<DocumentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_docs`);
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activity`);
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_suppliers`, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pos`, JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_docs`, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activity`, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const setSurface = (s: SurfaceType) => {
    setSurfaceState(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUser = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'Corporate Client') {
      setSurface('client');
    } else if (user.role === 'Supplier') {
      setSurface('supplier');
    } else {
      setSurface('management');
    }
    addToast('Role Switched', `Logged in as ${user.name} (${user.role})`, 'info');
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (modalName: string, data?: any) => {
    setModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setModal(null);
    setModalData(null);
  };

  const addEnquiry = (data: Omit<Enquiry, 'id' | 'referenceNo' | 'submittedAt' | 'updatedAt'>) => {
    const year = new Date().getFullYear();
    const count = enquiries.length + 1;
    const refNo = `KES-RFQ-${year}-${String(count).padStart(3, '0')}`;
    const newEnquiry: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      referenceNo: refNo,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      internalNotes: data.internalNotes || [],
      attachments: data.attachments || [],
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);

    // Add activity log
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'enquiry',
      title: `New RFQ registered: ${refNo}`,
      actor: currentUser.name,
      details: `${data.clientCompany} submitted '${data.title}'`,
      timestamp: 'Just now',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
    addToast('Enquiry Submitted', `Reference ${refNo} has been assigned and logged in the system.`, 'success');
    return refNo;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e))
    );
    addToast('Status Updated', `Enquiry status changed to ${status}`, 'info');
  };

  const assignEnquiry = (id: string, assignee: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, assignedTo: assignee, status: e.status === 'New' ? 'Assigned' : e.status } : e))
    );
    addToast('Enquiry Assigned', `Assigned to ${assignee}`, 'info');
  };

  const addEnquiryNote = (id: string, text: string) => {
    const note = {
      author: currentUser.name,
      text,
      timestamp: 'Just now',
    };
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              internalNotes: [...(e.internalNotes || []), note],
              updatedAt: new Date().toISOString(),
            }
          : e
      )
    );
    addToast('Internal Note Added', 'Your note has been appended to the audit trail.', 'success');
  };

  const addProject = (data: Omit<Project, 'id' | 'code' | 'documentsCount'>) => {
    const code = `KES-${2520 + projects.length}`;
    const newPrj: Project = {
      ...data,
      id: `prj-${Date.now()}`,
      code,
      documentsCount: 0,
    };
    setProjects((prev) => [newPrj, ...prev]);
    addToast('Project Created', `Project ${code} (${data.title}) initialized successfully.`, 'success');
    return code;
  };

  const updateProjectProgress = (id: string, percent: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, progressPercent: percent } : p))
    );
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          tasks: p.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
              : t
          ),
        };
      })
    );
  };

  const addProjectTask = (projectId: string, title: string, assignee: string, dueDate: string, priority: 'Low' | 'Medium' | 'High') => {
    const newTask = {
      id: `t-${Date.now()}`,
      title,
      assignee,
      dueDate,
      status: 'Pending' as const,
      priority,
    };
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p))
    );
    addToast('Task Added', `Task assigned to ${assignee}`, 'success');
  };

  const addSupplier = (data: Omit<Supplier, 'id' | 'code' | 'registeredDate'>) => {
    const code = `VEN-2026-${String(suppliers.length + 1).padStart(3, '0')}`;
    const newSup: Supplier = {
      ...data,
      id: `sup-${Date.now()}`,
      code,
      registeredDate: new Date().toISOString().split('T')[0],
    };
    setSuppliers((prev) => [newSup, ...prev]);
    addToast('Supplier Registered', `${data.name} added to vendor database with code ${code}`, 'success');
    return code;
  };

  const updateSupplierStatus = (id: string, status: SupplierVerification) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verificationStatus: status } : s))
    );
    addToast('Verification Updated', `Supplier verification changed to ${status}`, 'info');
  };

  const addPurchaseOrder = (data: Omit<PurchaseOrder, 'id' | 'poNumber' | 'issueDate'>) => {
    const poNum = `PO-${24100 + purchaseOrders.length}`;
    const newPO: PurchaseOrder = {
      ...data,
      id: `po-${Date.now()}`,
      poNumber: poNum,
      issueDate: new Date().toISOString().split('T')[0],
    };
    setPurchaseOrders((prev) => [newPO, ...prev]);
    addToast('Purchase Order Generated', `${poNum} issued for amount ${data.amount}`, 'success');
    return poNum;
  };

  const updatePOStatus = (id: string, status: PurchaseOrderStatus) => {
    setPurchaseOrders((prev) =>
      prev.map((po) =>
        po.id === id
          ? {
              ...po,
              status,
              approvedBy: status === 'Approved' ? currentUser.name : po.approvedBy,
            }
          : po
      )
    );
    addToast('PO Updated', `Order status changed to ${status}`, 'info');
  };

  const addDocument = (data: Omit<DocumentRecord, 'id' | 'uploadedDate'>) => {
    const newDoc: DocumentRecord = {
      ...data,
      id: `doc-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: currentUser.name,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addToast('Document Uploaded', `${data.title} (${data.fileType}) safely stored in repository.`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    addToast('Document Removed', 'File has been deleted from repository.', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_user`);
    localStorage.removeItem(`${STORAGE_KEY}_enquiries`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_suppliers`);
    localStorage.removeItem(`${STORAGE_KEY}_pos`);
    localStorage.removeItem(`${STORAGE_KEY}_docs`);
    localStorage.removeItem(`${STORAGE_KEY}_activity`);

    setCurrentUser(initialCurrentUser);
    setEnquiries(initialEnquiries);
    setProjects(initialProjects);
    setSuppliers(initialSuppliers);
    setPurchaseOrders(initialPurchaseOrders);
    setDocuments(initialDocuments);
    setActivityLogs(initialActivityLogs);
    setSurfaceState('management');
    setActiveManagementTab('Overview');

    addToast('Demo Data Reset', 'Platform restored to initial demonstration state with authentic Nigerian energy portfolio.', 'success');
  };

  return (
    <PlatformContext.Provider
      value={{
        currentUser,
        availableUsers: availableDemoUsers,
        switchUser,
        surface,
        setSurface,
        activeManagementTab,
        setActiveManagementTab,
        enquiries,
        projects,
        suppliers,
        purchaseOrders,
        documents,
        activityLogs,
        addEnquiry,
        updateEnquiryStatus,
        assignEnquiry,
        addEnquiryNote,
        addProject,
        updateProjectProgress,
        toggleTask,
        addProjectTask,
        addSupplier,
        updateSupplierStatus,
        addPurchaseOrder,
        updatePOStatus,
        addDocument,
        deleteDocument,
        toasts,
        addToast,
        removeToast,
        modal,
        modalData,
        openModal,
        closeModal,
        resetDemoData,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

