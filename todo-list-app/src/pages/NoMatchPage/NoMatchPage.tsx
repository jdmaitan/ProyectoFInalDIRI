import { FormattedMessage } from 'react-intl';

function NoMatchPage() {
  return (
    <div>
      <h1>
        <FormattedMessage id="notfound.title" defaultMessage="Página no encontrada" />
      </h1>
      <p>
        <FormattedMessage
          id="notfound.description"
          defaultMessage="Lo sentimos, la página que estás buscando no existe."
        />
      </p>
    </div>
  );
}

export default NoMatchPage;