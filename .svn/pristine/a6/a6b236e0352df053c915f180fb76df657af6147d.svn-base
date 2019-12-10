# Proposal Scraps





### Data Mesh Context

The twenty-first century is defined by data. Within the last two years, 90% of all data was generated, and that trend keeps increasing. We've entered into a time where no amount of human brain power can parse and manage all that data.

​	We've also have the ability to begin translating the real-world into the easily accessible and manipulatable digital world. The Internet of Things is a terribly powerful concept, augmenting our reality with digital sensors, giving us crucial insight into how our institutions and processes are working--or not working.

​	Industry has a clear jump on Big Data because of the unfathomable profit potential. However, education has failed to adopt IoT and Big Data as adamantly as industry. Education has great potential for such data collection and analysis techniques. Much of the psychology and science behind learning is still a mystery, but that is not an excuse to shy away from pedagogical experiments. We the new data revolution, we are primed to bring data insights into the classroom, bestowing super-human powers to the educator and shaping the classroom workflow to work for students. 

​	Not only have we found a need for data within educational institutions, but a pathway for data collection and management is a generalized need across multiple disciplines. You can imagine a host of sociological, political, psychological, and other problems which are intractable because of the lack of data or the wide dispersion of data. Abstracting away the nuts and bolts of data collection, aggregation, and management will free experts to productively engage with analysis. 

​	When experts are more productive, the world get better, faster.

​	We can imagine a final ecosystem of data sensors and sources bound to a particular institution, enabling researchers, developers, and educators to easily gather, interpret, and add data. For the technical illiterate, we envision a system that enables users to create event-based macros leveraging the data sources and I/O built into the ecosystem. There would also be some form of "data SDK" that would allow for rapid wrapping and deployment of data sources and sensors into the data mesh. Adding data into the mesh is as important as unifying it. 

​	Further, although this system provides flexibility and extensibility, its primary strength lies within the "built-ins". These built-ins are a certain set of software signals, sensors, and sources which can be deployed generically. For instance, we can envision a generic data dashboard which automatically plugs into the ecosystem and allows for metric analysis. Another built-in could be a mobile application wrapper that could stand-alone or operate in tandem with an institution's own mobile application, which automatically reports data to the larger ecosystem. 

​	Unfortunately, constructing such a "unified data mesh" is exceedingly complex and leaves the scope of this project. The specific solution we have decided upon is primarily management based but will also interact with a "unified data api" which we believe is a crucial pillar of the final unified data platform. This will provide a starting architecture for future development endeavors.





# Unified Data API



​	In order to begin the unified data mesh for the university, we will construct a single entry point for the data.  Accessing the entire data catalogue of the university will then become a matter of interacting with a single api, instead of many apis. 

​	To accomplish this feat, we envision a thin GraphQL api which will aggregate multiple disjoint data sources into one interface. Why is this important? GraphQL allows us to represent data as statically-typed objects. Each object has a finite set of fields capturing either atomic data types like strings, or additional object data types. This type of paradigm is useful for combining multiple related but independent data sources together in a flexible manner. The declarative nature of GraphQl corresponds naturally with our goal for a declarative complexity-free unified data mesh.

​	API consumers (in the form of web applications, mobile applications, other services, etc. ) can interact with the unified api to query for the entire UMD-related data. Conceptually, the complex system of data sources, becomes one object someone can pick and choose from. 

​	For instance, if a consumer is interested in student data (and has proper permissions) they can query for student objects from the GraphQL layer, and partition the object into fields they desire, such as attendance,  which will know how to reach out to the necessary RESTful APIs.