import React from 'react';
import { FormattedMessage } from 'react-intl';

const NoMatchPage: React.FC = () =>
{
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-red-600 mb-4">
        <FormattedMessage id="notfound.title" />
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        <FormattedMessage id="notfound.description" />
      </p>
    </div>
  );
};

export default NoMatchPage;