import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialOfficerProfile,
  initialProjects,
  initialObjections,
  initialParcels,
  initialNotifications,
  villageWiseTaskSummary
} from '../data/mockData';
import {
  proposingOfficerProfile,
  initialProposingProjects,
  initialProposingProposals,
  initialProposingDocuments,
  initialProposingAuditLogs,
  initialProposingNotifications,
  generatePreProposalAIAnalysis
} from '../data/proposingMockData';

const SwadeshContext = createContext();

export const SwadeshProvider = ({ children }) => {
  // Authentication & Officer State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('swadesh_auth') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('swadesh_user_role') || 'collector';
  });
  const [officerProfile, setOfficerProfile] = useState(initialOfficerProfile);
  const [proposingOfficer, setProposingOfficer] = useState(proposingOfficerProfile);
  
  // Active Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, notifications, objections, tasks, projects, compensation, notices, mutation, gis, documents
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-MH-2026-101');
  const [selectedVillage, setSelectedVillage] = useState('All');
  
  // Data Repositories
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('swadesh_projects');
    if (!saved) return initialProjects;
    const parsed = JSON.parse(saved);
    return parsed.length >= initialProjects.length ? parsed : initialProjects;
  });
  
  const [objections, setObjections] = useState(() => {
    const saved = localStorage.getItem('swadesh_objections');
    return saved ? JSON.parse(saved) : initialObjections;
  });
  
  const [parcels, setParcels] = useState(() => {
    const saved = localStorage.getItem('swadesh_parcels');
    return saved ? JSON.parse(saved) : initialParcels;
  });
  
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('swadesh_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Proposing Body State Repositories
  const [proposingProjects, setProposingProjects] = useState(() => {
    const saved = localStorage.getItem('swadesh_proposing_projects');
    return saved ? JSON.parse(saved) : initialProposingProjects;
  });

  const [proposingProposals, setProposingProposals] = useState(() => {
    const saved = localStorage.getItem('swadesh_proposing_proposals');
    return saved ? JSON.parse(saved) : initialProposingProposals;
  });

  const [proposingDocuments, setProposingDocuments] = useState(() => {
    const saved = localStorage.getItem('swadesh_proposing_documents');
    return saved ? JSON.parse(saved) : initialProposingDocuments;
  });

  const [proposingAuditLogs, setProposingAuditLogs] = useState(() => {
    const saved = localStorage.getItem('swadesh_proposing_audit_logs');
    return saved ? JSON.parse(saved) : initialProposingAuditLogs;
  });

  const [proposingNotifications, setProposingNotifications] = useState(() => {
    const saved = localStorage.getItem('swadesh_proposing_notifications');
    return saved ? JSON.parse(saved) : initialProposingNotifications;
  });
  
  const [selectedObjection, setSelectedObjection] = useState(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  
  // Modal Controllers
  const [isDigitalSignOpen, setIsDigitalSignOpen] = useState(false);
  const [digitalSignTarget, setDigitalSignTarget] = useState(null); // { type: 'compensation' | 'notice' | 'mutation', item: obj }
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('swadesh_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('swadesh_objections', JSON.stringify(objections));
  }, [objections]);

  useEffect(() => {
    localStorage.setItem('swadesh_parcels', JSON.stringify(parcels));
  }, [parcels]);

  useEffect(() => {
    localStorage.setItem('swadesh_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('swadesh_proposing_projects', JSON.stringify(proposingProjects));
  }, [proposingProjects]);

  useEffect(() => {
    localStorage.setItem('swadesh_proposing_proposals', JSON.stringify(proposingProposals));
  }, [proposingProposals]);

  useEffect(() => {
    localStorage.setItem('swadesh_proposing_documents', JSON.stringify(proposingDocuments));
  }, [proposingDocuments]);

  useEffect(() => {
    localStorage.setItem('swadesh_proposing_audit_logs', JSON.stringify(proposingAuditLogs));
  }, [proposingAuditLogs]);

  useEffect(() => {
    localStorage.setItem('swadesh_proposing_notifications', JSON.stringify(proposingNotifications));
  }, [proposingNotifications]);

  // Auth Handler
  const login = (role = 'tahsildar', officerId, password) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('swadesh_auth', 'true');
    localStorage.setItem('swadesh_user_role', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('swadesh_auth');
    localStorage.removeItem('swadesh_user_role');
  };

  // Helper for exact timestamp formatted: 24 Aug 2026 | 04:42:18 PM IST
  const getExactTimestamp = () => {
    return new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true, timeZone: 'Asia/Kolkata'
    }) + ' IST';
  };

  // Proposing Body Action Handlers
  const addProposingAuditLog = ({ action, remarks, projectId, proposalId, previousStatus = "-", newStatus = "-", signatureStatus = "Digitally Signed" }) => {
    const newLog = {
      id: `AUD-PB-${Date.now().toString().slice(-4)}`,
      action,
      user: proposingOfficer.name + ", " + (proposingOfficer.designation.split('(')[0] || 'CGM'),
      department: proposingOfficer.authority,
      timestamp: getExactTimestamp(),
      previousStatus,
      newStatus,
      remarks,
      signatureStatus,
      projectId: projectId || "-",
      proposalId: proposalId || "-"
    };
    setProposingAuditLogs(prev => [newLog, ...prev]);
  };

  const addProposingNotification = ({ title, category, message, projectId, proposalId }) => {
    const newNotif = {
      id: `PNOTIF-${Date.now().toString().slice(-4)}`,
      title,
      category,
      message,
      timestamp: getExactTimestamp(),
      read: false,
      projectId: projectId || null,
      proposalId: proposalId || null
    };
    setProposingNotifications(prev => [newNotif, ...prev]);
  };

  const markProposingNotificationAsRead = (id) => {
    setProposingNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleCreateProposingProject = (projectData, isDraft = false, signCert = null) => {
    const timestamp = getExactTimestamp();
    const projectId = projectData.id || `PRJ-MH-2026-${Math.floor(200 + Math.random() * 800)}`;
    
    const newProject = {
      ...projectData,
      id: projectId,
      status: isDraft ? "Draft" : "Created",
      stage: isDraft ? "Draft Preparation" : "Project Created",
      creationTimestamp: timestamp,
      signedTimestamp: isDraft ? "-" : timestamp,
      digitalSignatureStatus: isDraft ? "Unsigned Draft" : "Digitally Signed",
      signerName: isDraft ? "-" : (signCert?.signer || proposingOfficer.name),
      lastUpdated: new Date().toISOString().split('T')[0],
      progress: isDraft ? 5 : 10,
      proposalsCount: 0,
      image: projectData.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
    };

    setProposingProjects(prev => [newProject, ...prev]);

    // Also register in shared projects for cross-stakeholder traceability
    setProjects(prev => {
      const exists = prev.some(p => p.id === projectId);
      if (exists) return prev;
      return [{
        id: projectId,
        name: newProject.name,
        type: newProject.projectCategory || "Infrastructure Corridor",
        district: newProject.district,
        taluka: newProject.taluka || "Statewide",
        totalParcels: 0,
        verifiedParcels: 0,
        pendingParcels: 0,
        disputeParcels: 0,
        totalAreaHa: parseFloat(newProject.landRequiredHa) || 0,
        totalLandowners: parseInt(newProject.totalLandowners) || 0,
        estCompensation: newProject.estimatedBudget || "₹ 0.00 Cr",
        villages: newProject.villages || [],
        image: newProject.image,
        status: newProject.status,
        assignedDate: new Date().toISOString().split('T')[0]
      }, ...prev];
    });

    addProposingAuditLog({
      action: isDraft ? "Project Draft Saved" : "Project Created & Digitally Signed",
      remarks: isDraft ? "Project specifications saved in Draft status." : `Officially created with Class-3 DSC (${signCert?.certSerial || 'NIC-DSC-2026'}). Assigned Project ID: ${projectId}`,
      projectId: projectId,
      previousStatus: isDraft ? "-" : "Draft",
      newStatus: isDraft ? "Draft" : "Created",
      signatureStatus: isDraft ? "Unsigned" : "Digitally Signed"
    });

    addProposingNotification({
      title: isDraft ? "Project Draft Saved" : "Project Officially Created",
      category: "Project",
      message: isDraft ? `Draft project '${newProject.name}' saved.` : `Project '${newProject.name}' (${projectId}) digitally signed and registered in SWADESH repository.`,
      projectId: projectId
    });

    return newProject;
  };

  const handleCreateProposingProposal = (proposalData, actionType = 'submit') => {
    // actionType: 'draft' | 'pre-proposal' | 'submit'
    const timestamp = getExactTimestamp();
    const proposalId = proposalData.id || `PROP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    let status = "Draft";
    let submissionStage = "Under Preparation";
    if (actionType === 'pre-proposal') {
      status = "Pre-Proposal Analysis";
      submissionStage = "AI Preliminary Analysis Generated";
    } else if (actionType === 'submit') {
      status = "Submitted";
      submissionStage = "Under Review by State Cabinet";
    }

    const newProposal = {
      ...proposalData,
      id: proposalId,
      status,
      submissionStage,
      submittedBy: proposingOfficer.name + ", " + (proposingOfficer.designation.split('(')[0] || 'CGM'),
      submissionTimestamp: timestamp,
      currentStageExplanation: actionType === 'submit' 
        ? "Proposal submitted to State Government / Collectorate. Awaiting Expert Appraisal Committee review and Section 4 notification clearance."
        : actionType === 'pre-proposal'
        ? "Submitted for pre-proposal analytical assessment. System-generated report available for review."
        : "Draft saved under preparation.",
      previousStages: [
        { name: "Draft Created", timestamp, user: proposingOfficer.name, status: "Completed" },
        ...(actionType === 'pre-proposal' ? [{ name: "Pre-Proposal Analysis Generated", timestamp, user: "System / AI Model", status: "Completed" }] : []),
        ...(actionType === 'submit' ? [{ name: "Proposal Digitally Signed & Submitted", timestamp, user: proposingOfficer.name, status: "Completed" }] : [])
      ],
      milestones: proposalData.milestones || [
        { name: "Proposal Preparation & GIS Validation", plannedDate: proposalData.startDate || "2026-09-01", actualDate: timestamp.split('|')[0].trim(), status: "Completed", remarks: "All land parcels mapped on GIS." },
        { name: "Submission to State Authority", plannedDate: proposalData.startDate || "2026-09-10", actualDate: actionType === 'submit' ? timestamp.split('|')[0].trim() : "-", status: actionType === 'submit' ? "Completed" : "Pending", remarks: "Class-3 DSC Signed." },
        { name: "SIA Notification & Public Hearings", plannedDate: "2026-11-15", actualDate: "-", status: "Pending", remarks: "Empaneled agency allocation." },
        { name: "Preliminary Notification (Sec 11)", plannedDate: "2027-01-30", actualDate: "-", status: "Pending", remarks: "-" },
        { name: "Land Survey & Objections (Sec 15)", plannedDate: "2027-04-30", actualDate: "-", status: "Pending", remarks: "-" },
        { name: "Statutory Award Declaration (Sec 23)", plannedDate: "2027-08-31", actualDate: "-", status: "Pending", remarks: "-" },
        { name: "Direct Benefit Transfer / Compensation", plannedDate: "2027-11-30", actualDate: "-", status: "Pending", remarks: "-" },
        { name: "R&R Resettlement Package", plannedDate: "2028-01-31", actualDate: "-", status: "Pending", remarks: "-" },
        { name: "Final Mutation & Possession", plannedDate: "2028-04-30", actualDate: "-", status: "Pending", remarks: "-" }
      ],
      financeSummary: proposalData.financeSummary || {
        totalBudget: proposalData.estimatedCost || "₹ 0.00 Cr",
        disbursedToDate: "₹ 0.00 Cr",
        remainingBudget: proposalData.estimatedCost || "₹ 0.00 Cr",
        estimatedOverrun: "₹ 0.00 Cr",
        committedAmount: `₹ ${(parseFloat((proposalData.estimatedCost || '100').replace(/[^0-9.]/g, '')) * 0.85).toFixed(2)} Cr`,
        paymentsLedger: proposalData.advanceDeposit ? [
          { id: `PFMS-TX-${Date.now().toString().slice(-4)}`, account: "SLAO Escrow Account", pfmsStatus: "PFMS Verified", date: timestamp, amount: proposalData.advanceDeposit, purpose: "Advance SLAO Deposit" }
        ] : []
      }
    };

    setProposingProposals(prev => {
      const filtered = prev.filter(p => p.id !== proposalId);
      return [newProposal, ...filtered];
    });

    addProposingAuditLog({
      action: actionType === 'submit' ? "Proposal Submitted" : actionType === 'pre-proposal' ? "Submitted for Pre-Proposal Analysis" : "Proposal Draft Saved",
      remarks: actionType === 'submit' 
        ? `Proposal variant '${newProposal.name}' (${proposalId}) officially forwarded to State Government.`
        : actionType === 'pre-proposal'
        ? `Proposal variant '${newProposal.name}' processed through preliminary AI decision-support models.`
        : `Proposal draft saved under project ${newProposal.projectId}.`,
      projectId: newProposal.projectId,
      proposalId: proposalId,
      previousStatus: "Draft",
      newStatus: status,
      signatureStatus: actionType === 'submit' ? "Digitally Signed" : "-"
    });

    addProposingNotification({
      title: actionType === 'submit' ? "Proposal Submitted to State" : actionType === 'pre-proposal' ? "Pre-Proposal Analysis Ready" : "Proposal Draft Saved",
      category: "Proposal",
      message: `Proposal ${proposalId} (${newProposal.variant}) — ${status}.`,
      projectId: newProposal.projectId,
      proposalId: proposalId
    });

    return newProposal;
  };

  const handleUploadProposingDocument = (docData) => {
    const timestamp = getExactTimestamp();
    const existingIndex = proposingDocuments.findIndex(d => d.name === docData.name && d.projectId === docData.projectId);

    if (existingIndex >= 0) {
      // Version bump
      const existing = proposingDocuments[existingIndex];
      const newVersionNum = (existing.version || 1) + 1;
      const updatedDoc = {
        ...existing,
        version: newVersionNum,
        uploadedBy: docData.uploadedBy || proposingOfficer.name,
        department: docData.department || proposingOfficer.authority,
        uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        exactTimestamp: timestamp,
        status: "Verified",
        digitalSignatureStatus: "Digitally Signed",
        fileSize: docData.fileSize || "14.2 MB",
        versions: [
          ...existing.versions,
          {
            version: newVersionNum,
            uploadedBy: docData.uploadedBy || proposingOfficer.name,
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            timestamp,
            status: "Active & Verified",
            remarks: docData.remarks || `Version ${newVersionNum} uploaded.`
          }
        ]
      };
      setProposingDocuments(prev => prev.map((d, i) => i === existingIndex ? updatedDoc : d));

      addProposingAuditLog({
        action: `Document Updated (v${newVersionNum})`,
        remarks: `${docData.name} updated to version ${newVersionNum} without silent overwrite.`,
        projectId: docData.projectId,
        proposalId: docData.proposalId
      });
      return updatedDoc;
    } else {
      const newDoc = {
        id: `DOC-PB-${Date.now().toString().slice(-4)}`,
        projectId: docData.projectId,
        projectName: docData.projectName,
        proposalId: docData.proposalId || "-",
        name: docData.name,
        type: docData.type || "Project Report",
        version: 1,
        uploadedBy: docData.uploadedBy || proposingOfficer.name,
        designation: proposingOfficer.designation,
        department: docData.department || proposingOfficer.authority,
        uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        exactTimestamp: timestamp,
        status: "Verified",
        digitalSignatureStatus: "Digitally Signed",
        signerName: proposingOfficer.name,
        fileSize: docData.fileSize || "12.5 MB",
        versions: [
          {
            version: 1,
            uploadedBy: docData.uploadedBy || proposingOfficer.name,
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            timestamp,
            status: "Active & Verified",
            remarks: "Initial uploaded version."
          }
        ]
      };
      setProposingDocuments(prev => [newDoc, ...prev]);

      addProposingAuditLog({
        action: "Document Uploaded",
        remarks: `${docData.name} (v1) uploaded and digitally signed.`,
        projectId: docData.projectId,
        proposalId: docData.proposalId
      });
      return newDoc;
    }
  };

  // Workflow Action Handlers
  const handleResolveObjection = (objectionId, action, remarks) => {
    setObjections(prev => prev.map(obj => {
      if (obj.id === objectionId) {
        let newStatus = obj.status;
        if (action === 'Approve Resolution') newStatus = 'Resolved';
        if (action === 'Send Back to Talathi') newStatus = 'Sent Back';
        if (action === 'Request Additional Information') newStatus = 'Under Review';
        return { ...obj, status: newStatus, remarks };
      }
      return obj;
    }));
    
    // Add Notification
    addNotification({
      title: `Objection Action: ${action}`,
      category: "Objection",
      message: `Tahsildar executed '${action}' on Objection #${objectionId}. Status updated to reflect action.`
    });
  };

  const handleApproveCompensation = (parcelId) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        return { ...p, compensationStatus: 'Approved by Tahsildar' };
      }
      return p;
    }));
  };

  const handleIssueNotice = (parcelId) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        return {
          ...p,
          noticeStatus: 'Ready for Printing',
          noticeDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
    addNotification({
      title: "Statutory Notice Issued",
      category: "Notice",
      message: `Section 3E Notice issued for Parcel ${parcelId}. Delivered to landowner mobile.`
    });
  };

  const handleApproveFinalMutation = (parcelId, signCertificate) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        return {
          ...p,
          mutationStatus: 'Mutation Approved by Tahsildar',
          mutationStep: 5 // Sent to Talathi
        };
      }
      return p;
    }));

    addNotification({
      title: "Final Mutation Approved & Talathi Notified",
      category: "Mutation",
      message: `Final Mutation for Parcel ${parcelId} digitally signed. Notification dispatched to Talathi for land record mutation.`
    });
  };

  const addNotification = ({ title, category, message }) => {
    const newNotif = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title,
      category,
      message,
      timestamp: "Just Now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const triggerDigitalSignModal = (type, item) => {
    setDigitalSignTarget({ type, item });
    setIsDigitalSignOpen(true);
  };

  return (
    <SwadeshContext.Provider value={{
      isAuthenticated,
      userRole,
      setUserRole,
      login,
      logout,
      officerProfile,
      proposingOfficer,
      activeTab,
      setActiveTab,
      selectedProjectId,
      setSelectedProjectId,
      selectedVillage,
      setSelectedVillage,
      projects,
      objections,
      parcels,
      notifications,
      selectedObjection,
      setSelectedObjection,
      selectedParcel,
      setSelectedParcel,
      villageWiseTaskSummary,
      handleResolveObjection,
      handleApproveCompensation,
      handleIssueNotice,
      handleApproveFinalMutation,
      addNotification,
      markNotificationAsRead,
      isDigitalSignOpen,
      setIsDigitalSignOpen,
      digitalSignTarget,
      triggerDigitalSignModal,
      isDocViewerOpen,
      setIsDocViewerOpen,
      activeDoc,
      setActiveDoc,
      isGlobalSearchOpen,
      setIsGlobalSearchOpen,
      // Proposing Body Context
      proposingProjects,
      setProposingProjects,
      proposingProposals,
      setProposingProposals,
      proposingDocuments,
      setProposingDocuments,
      proposingAuditLogs,
      setProposingAuditLogs,
      proposingNotifications,
      setProposingNotifications,
      handleCreateProposingProject,
      handleCreateProposingProposal,
      handleUploadProposingDocument,
      addProposingAuditLog,
      addProposingNotification,
      markProposingNotificationAsRead,
      getExactTimestamp
    }}>
      {children}
    </SwadeshContext.Provider>
  );
};

export const useSwadesh = () => useContext(SwadeshContext);
