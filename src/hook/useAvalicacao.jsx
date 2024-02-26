const useAvaliacao = (a, stars) => {
  stars = [];
  for (let i = 1; i <= a; i++) {
    stars.push(<i className="avaliacao-do-site bi bi-star-fill" key={i}></i>);
  }
  return stars;
};

export default useAvaliacao;
