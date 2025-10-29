import {Helmet} from "react-helmet";

type HelmetProviderProps = {
  title?: string;
  description?: string;
};

const HelmetProvider = ({
  title = "My Title",
  description = "Simple Firebase Chat Application",
}: HelmetProviderProps) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title}
        </title>
        <meta name="description" content={description} />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
};

export default HelmetProvider;