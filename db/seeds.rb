user_list = %w(Bart Kevin Max Rafael Charly Megan)

posts_length = 10

collections_length = 4

user_list.each do |name| 
  User.create(name: name, email: "#{name.downcase}@gmail.com", password: "1234")
end

posts_length.times do |n|
  post = Post.create(
    body: "Body #{n.to_s}",
    title: "Title #{n.to_s}",
    picture: "Image#{n.to_s}.png",
    user: User.find(rand(1..user_list.length))
  )

  rand(1..user_list.length).times do |n| 
    Comment.create(
      body: "Body #{n.to_s}",
      user: User.find(n + 1),
      post: post      
    )
  end

  rand(1..user_list.length).times do |n| 
    Bookmark.create(
      user: User.find(n + 1),
      post: post      
    )
  end

  rand(1..user_list.length).times do |n| 
    post.claps << Clap.new(
      user: User.find(n + 1),
      total: rand(1..10)
    )
  end
end

collections_length.times do |n|
  collection = Collection.create(
    title: "Title #{n.to_s}",
    description: "Description #{n.to_s}",
    picture: "Image#{n.to_s}.png",
    user: User.find(rand(1..user_list.length))
  )

  rand(1..posts_length).times do |n| 
    collection.posts << Post.find(n + 1)  
  end
end