
<?php

require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only GET requests are allowed."
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "You are not logged in."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "SELECT id, username, email
         FROM users
         WHERE id = ?"
    );

    $stmt->execute([$_SESSION["user_id"]]);
    $user = $stmt->fetch();

    if (!$user) {
        $_SESSION = [];
        session_destroy();

        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "User account not found."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "user" => $user
    ]);

} catch (PDOException $e) {
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve user information."
    ]);
}
