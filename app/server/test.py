import os
import server
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, server.app.config['DATABASE'] = tempfile.mkstemp()
        server.app.testing = True
        self.app = server.app.test_client()
        with server.app.app_context():
            server.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(server.app.config['DATABASE'])

    def test_logged_out(self):
        data = self.app.get("/status")
        assert data.status_code == 200

if __name__ == '__main__':
    unittest.main()