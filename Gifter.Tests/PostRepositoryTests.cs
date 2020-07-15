using Gifter.Models;
using Gifter.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Gifter.Tests
{
    public class PostRepositoryTests : EFTestFixture
    {
        public PostRepositoryTests()
        {
            AddSampleData();
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Title()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("Dude", false);

            Assert.Equal(2, results.Count);
            Assert.Equal("El Duderino", results[0].Title);
            Assert.Equal("The Dude", results[1].Title);
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Caption()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("it is no dream", false);

            Assert.Equal(1, results.Count);
            Assert.Equal("If you will it, Dude, it is no dream", results[0].Caption);
        }

        [Fact]
        public void Search_Should_Return_Empty_List_If_No_Matches()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("foobarbazcatgrill", false);

            Assert.NotNull(results);
            Assert.Empty(results);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_First()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", true);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[0].Title);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_Last()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", false);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[3].Title);
        }

        [Fact]
        public void User_Can_Delete_Post_With_Comment()
        {
            var postIdWithComment = 2;
            var repo = new PostRepository(_context);

            // Attempt to delete it
            repo.Delete(postIdWithComment);

            // Now attempt to get it
            var result = repo.GetById(postIdWithComment);

            Assert.Null(result);
        }

        [Fact]
        public void Resulting_Posts_Can_Be_Ordered_Alphabetically_By_Title()
        {
            var firstTitle = "A Rug";
            var repo = new PostRepository(_context);
            var result = repo.GetByUserProfileId(3);

            Assert.Equal(2, result.Count);
            Assert.Equal(firstTitle, result[0].Title);
        }

        [Fact]
        public void Resulting_Posts_Belong_Only_To_User_Whos_Id_Was_Passed_In()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetByUserProfileId(2);

            Assert.Equal(2, result[0].UserProfileId);
            
        }

        [Fact]
        public void Resulting_Posts_Returns_Empty_List_If_Id_Does_Not_Match_A_User()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetByUserProfileId(4);

            Assert.NotNull(result);
            Assert.Empty(result);

        }

        [Fact]
        public void Most_Recent_Returns_Result_Amt_Equal_To_Arg_Passed_In()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(100);

            Assert.Equal(4, result.Count);

        }

        [Fact]
        public void Most_Recent_Returns_Empty_List_If_No_Arg_Passed_In()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(0);

            Assert.NotNull(result);
            Assert.Empty(result);

        }

        [Fact]
        public void Most_Recent_Always_Returns_Most_Recent_Post_As_First_Result()
        {
            var repo = new PostRepository(_context);
            var result = repo.GetMostRecent(4);

            Assert.Equal("A Rug", result[3].Title);

        }

        // Add sample data
        private void AddSampleData()
        {
            var user1 = new UserProfile()
            {
                Id = 1,
                Name = "Walter",
                Email = "walter@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(365),
                FirebaseUserId = "DVoG3bMFC2TYf0jYCD4gxKMM2YD2"
            };

            var user2 = new UserProfile()
            {
                Id = 2,
                Name = "Donny",
                Email = "donny@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "DVoG3bMFC2TYf0jYCD4gxKMM2YD2"
            };

            var user3 = new UserProfile()
            {
                Id = 3,
                Name = "The Dude",
                Email = "thedude@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "DVoG3bMFC2TYf0jYCD4gxKMM2YD2"
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);

            var post1 = new Post()
            {
                Caption = "If you will it, Dude, it is no dream",
                Title = "The Dude",
                ImageUrl = "http://foo.gif",
                UserProfileId = 1,
                UserProfile = user1,
                DateCreated = DateTime.Now - TimeSpan.FromDays(10),
            };

            var post2 = new Post()
            {
                Caption = "If you're not into the whole brevity thing",
                Title = "El Duderino",
                ImageUrl = "http://foo.gif",
                UserProfileId = 2,
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(11),
            };

            var post3 = new Post()
            {
                Caption = "It really ties the room together",
                Title = "My Rug",
                ImageUrl = "http://foo.gif",
                UserProfileId = 3,
                UserProfile = user3,
                DateCreated = DateTime.Now - TimeSpan.FromDays(12),
            };
            
            var post4 = new Post()
            {
                Caption = "Testing post order by",
                Title = "A Rug",
                ImageUrl = "http://foo.gif",
                UserProfileId = 3,
                UserProfile = user3,
                DateCreated = DateTime.Now - TimeSpan.FromDays(13),
            };

            var comment1 = new Comment()
            {
                Post = post2,
                Message = "This is great",
                UserProfile = user3
            };

            var comment2 = new Comment()
            {
                Post = post2,
                Message = "The post really tied the room together",
                UserProfile = user2
            };

            _context.Add(post1);
            _context.Add(post2);
            _context.Add(post3);
            _context.Add(post4);
            _context.Add(comment1);
            _context.Add(comment2);
            _context.SaveChanges();
        }

    }
}