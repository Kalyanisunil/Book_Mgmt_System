package com.valoriz.BookMgmtSystem.Service;

import com.valoriz.BookMgmtSystem.Models.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {

    @Autowired
    private MongoOperations mongoOperations;

    public long getSequenceNumber(String sequenceName) {
        // object finds the document where _id == sequenceName
        Query query = new Query(Criteria.where("_id").is(sequenceName));

        //inc - increment
        Update update = new Update().inc("seq", 1);

        //create or update based on existence
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        DatabaseSequence counter = mongoOperations.findAndModify(
                query, update, options, DatabaseSequence.class);

        return counter != null ? counter.getSeq() : 1;
    }
}
