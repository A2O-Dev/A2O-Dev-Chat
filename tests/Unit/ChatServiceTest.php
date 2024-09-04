<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\ChatService;
use App\Models\User;
use Mockery;
use Illuminate\Foundation\Testing\WithFaker;

class ChatServiceTest extends TestCase
{
    use WithFaker;

    protected $chatServiceMock;
    protected $userMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->chatServiceMock = Mockery::mock(ChatService::class);

        $this->userMock = Mockery::mock(User::class);
        $this->userMock->shouldReceive('getAttribute')->with('id')->andReturn(1);
    }

    public function testHandleSearchReturnsCorrectData()
    {
        // given
        $searchQuery = 'test';

        $expectedResult = collect([
            ['id' => 1, 'name' => 'Test Room 1'],
            ['id' => 2, 'name' => 'Test Room 2'],
        ]);


        $this->chatServiceMock->shouldReceive('handleSearch')
            ->once()
            ->with($this->userMock, $searchQuery)
            ->andReturn($expectedResult);

        // when
        $result = $this->chatServiceMock->handleSearch($this->userMock, $searchQuery);

        // then
        $this->assertEquals($expectedResult, $result);
    }

    public function testHandleSearchWithEmptyQuery()
    {
        // given
        $searchQuery = '';

        $expectedResult = collect([]);

        $this->chatServiceMock->shouldReceive('handleSearch')
            ->once()
            ->with($this->userMock, $searchQuery)
            ->andReturn($expectedResult);

        // when
        $result = $this->chatServiceMock->handleSearch($this->userMock, $searchQuery);

        // then
        $this->assertEquals($expectedResult, $result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
