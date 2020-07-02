import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";

export const PostComment = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Comments
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {post.comments.map((c) => (
              <p key={c.id}>{c.message}</p>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
