package api.starwars;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import api.starwars.Movie;
import api.starwars.MoviesRepository;

@CrossOrigin(origins = "*")
@RestController
public class MoviesController {

 @Autowired
 MoviesRepository repo;

 @PostMapping(value = "/movies", consumes = "application/json")
 public ResponseEntity < Boolean > saveMovie(@RequestBody Movie movies) {

  repo.save(movies);
  return new ResponseEntity < Boolean > (HttpStatus.OK);

 }

 @DeleteMapping("/movies/{id}")
 public ResponseEntity < Boolean > deleteMovie(@PathVariable("id") Long id) {

  repo.deleteById(id);
  return new ResponseEntity < Boolean > (HttpStatus.OK);

 }

 @GetMapping("/movies")
 public ResponseEntity < List < Movie >> getAll() {
  List < Movie > movies = new ArrayList < > ();
  repo.findAll().forEach(m -> movies.add(m));

  return new ResponseEntity < List < Movie >> (movies, HttpStatus.OK);
 }

 // @PatchMapping(value = "/movies", consumes = "application/json")
 // public ResponseEntity<Boolean> updateMovie(@RequestBody Movie movies) {

 //     repo.save(movies);
 //     return new ResponseEntity<Boolean>(HttpStatus.OK);

 // }

}