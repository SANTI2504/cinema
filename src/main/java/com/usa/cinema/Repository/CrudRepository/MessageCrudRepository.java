package com.usa.cinema.Repository.CrudRepository;

import com.usa.cinema.Model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
