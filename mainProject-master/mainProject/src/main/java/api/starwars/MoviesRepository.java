package api.starwars;


import org.springframework.data.repository.CrudRepository;
import api.starwars.Movie;


public interface MoviesRepository extends CrudRepository <Movie, Long>{

}