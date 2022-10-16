package com.example.usareto3.Repository.CrudRepository;

import com.example.usareto3.Model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
