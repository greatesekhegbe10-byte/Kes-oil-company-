import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { NewEnquiryModal } from './NewEnquiryModal';
import { CreateProjectModal } from './CreateProjectModal';
import { NewPOModal } from './NewPOModal';
import { RegisterSupplierModal } from './RegisterSupplierModal';
import { UploadDocumentModal } from './UploadDocumentModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { DemoRolesModal } from './DemoRolesModal';

export const ModalContainer: React.FC = () => {
  const { modal } = usePlatform();

  if (!modal) return null;

  switch (modal) {
    case 'new-enquiry':
    case 'request-quotation':
      return <NewEnquiryModal />;
    case 'create-project':
      return <CreateProjectModal />;
    case 'new-po':
      return <NewPOModal />;
    case 'register-supplier':
      return <RegisterSupplierModal />;
    case 'upload-document':
      return <UploadDocumentModal />;
    case 'global-search':
      return <GlobalSearchModal />;
    case 'demo-roles':
      return <DemoRolesModal />;
    default:
      return null;
  }
};

