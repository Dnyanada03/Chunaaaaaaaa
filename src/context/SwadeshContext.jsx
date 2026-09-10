import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialOfficerProfile,
  initialProjects,
  initialObjections,
  initialParcels,
  initialNotifications,
  villageWiseTaskSummary
} from '../data/mockData';

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
  
  // Active Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, notifications, objections, tasks, projects, compensation, notices, mutation, gis, documents
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-MH-2026-101');
  const [selectedVillage, setSelectedVillage] = useState('All');
  
  // Data Repositories
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('swadesh_projects');
    if (!saved) return initialProjects;
    const parsed = JSON.parse(saved);
    return parsed.length === initialProjects.length ? parsed : initialProjects;
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
      setIsGlobalSearchOpen
    }}>
      {children}
    </SwadeshContext.Provider>
  );
};

export const useSwadesh = () => useContext(SwadeshContext);
