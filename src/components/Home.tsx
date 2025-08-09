import { useEffect, useState } from 'react';
import Main from './Main';
import LastPost from './LastPost';
import CardPost from './CardPost';
import { getAllPosts, type PostResponse } from '../api/get-all-posts';
import Header from './Header';
import Footer from './Footer';

const filters = ["Todos", "Tecnologia", "Startups", "Lifestyle"];

export default function Home() {

  const [selectFilter, setSelectFilter] = useState<string>("Todos");
  const [postsFiltered, setPostsFiltered] = useState<PostResponse[]>([]);
  const [allPosts, setAllPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getAllPosts()
        if (posts) {
          setAllPosts(posts)
          setPostsFiltered(posts)
        }
      } catch (error) {
        console.error("Erro ao buscar os posts:", error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    console.log(selectFilter)
    if(selectFilter != "Todos") {
      const filtered = allPosts.filter(each => each.type === selectFilter)
      console.log("filtered:", filtered)
      setPostsFiltered(filtered)
    }else{
      setPostsFiltered(allPosts)
    }

  }, [allPosts, selectFilter])
  
  return (
    <div className='w-full min-h-screen font-poppins'>
      <Header />
      <Main />
      <section className="w-full flex flex-col items-center">
        <LastPost />
          <div className="w-[50%] flex gap-8 max-md:gap-4 justify-center my-10">
            {filters.map(filter => 
              filter === selectFilter ? (
                <span 
                  key={filter} 
                  onClick={() => setSelectFilter(filter)}  
                  className="bg-black text-white cursor-pointer">{filter}</span>
              ) : (
                <span 
                  key={filter} 
                  onClick={() => setSelectFilter(filter)} 
                  className="cursor-pointer">{filter}</span>
              )
            )}  
          </div>
         {postsFiltered.length != 1 ? (
            <div className="w-[78%] grid grid-cols-4 gap-5 max-md:w-[90%] max-md:grid-cols-2">
              {postsFiltered.slice(1).map((post) => (
                <CardPost 
                  key={post.id}
                  id={post.id} 
                  imagePostUrl={post.imagePostUrl} 
                  type={post.type} 
                  creator={post.creator} 
                  title={post.title}
                />
              ))}
            </div>
          ) : (
            <p>Carregando....</p>
          )}
        </section>
        <Footer />
    </div>
  )
}

