const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

function App() {
  const { Fragment, useState, useEffect } = React;
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: [],
    }
  );

  // return (
  //   <Fragment>
  
  //     {isLoading ? (
  //       <div>Loading ...</div>
  //     ) : (
  //       <ul>
  //         {data.hits.map((item) => (
  //           <li key={item.objectID}>
  //             <a href={item.url}>{item.title}</a>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </Fragment>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
